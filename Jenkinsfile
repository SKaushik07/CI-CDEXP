pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'hixej84931fna6/nodejs_exp:latest'
        registryCredential = credentials('docker-hub-config')
        // KUBECONFIG = '/home/xs309-shusai/Downloads/sahil-config'

    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    def dockerCmd = isUnix() ? 'docker' : 'docker.exe'
                    sh "${dockerCmd} build -t ${DOCKER_IMAGE} ."
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    def dockerCmd = isUnix() ? 'docker' : 'docker.exe'
                    docker.withRegistry('https://registry.hub.docker.com', 'registryCredential') {
                        def dockerImage = docker.image("${DOCKER_IMAGE}")
                        dockerImage.push()
                    }
                }
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                withCredentials([file(credentialsId: 'kube-config-id', variable: 'KUBECONFIG')]) {
                    sh """
                    kubectl apply -f ./deployment.yaml --namespace nodejs-exp --validate=false
                    """
                }
            }
        }
    }
}