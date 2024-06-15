pipeline {
    agent any
    
    environment {
        DOCKER_HUB_CREDENTIALS = credentials('hixej84931fna6') // Jenkins credentials ID for Docker Hub
        IMAGE_TAG = "latest"
    }
    
    stages {
        stage('Build') {
            steps {
                retry(max: 3) {
                    git 'https://github.com/SKaushik07/CI-CDEXP.git'
                }
                sh 'npm install'
            }
        }
        
        stage('Dockerize and Push to Docker Hub') {
            steps {
                script {
                    docker.build("hixej84931fna6/nodejs_exp:${IMAGE_TAG}")
                    withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'DOCKER_HUB_CREDENTIALS', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD']]) {
                        docker.withRegistry('https://hub.docker.com', 'DOCKER_HUB_CREDENTIALS') {
                            docker.image("hixej84931fna6/nodejs_exp:${IMAGE_TAG}").push()
                        }
                    }
                }
            }
        }
        
        // stage('Deploy to Kubernetes') {
        //     steps {
        //         // Use Kubernetes plugin to deploy to Kubernetes cluster
        //         withCredentials([file(credentialsId: 'kube-config-id', variable: 'KUBECONFIG')]) {
        //             sh """
        //             export KUBECONFIG=$KUBECONFIG
        //             kubectl apply -f path/to/your/kubernetes/deployment.yaml --namespace default
        //             """
        //         }
        //     }
        // }
    }
}
