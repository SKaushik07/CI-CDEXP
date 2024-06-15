pipeline {
    agent any
    
    environment {
        DOCKER_HUB_CREDENTIALS = credentials('hixej84931fna6')
        // KUBE_CONFIG = credentials('kube-config-id') // Uncomment if you need Kubernetes credentials
        IMAGE_TAG = "latest" 
    }
    
    stages {
        stage('Build') {
            steps {
                // Checkout your Node.js project code
                git 'https://github.com/SKaushik07/CI-CDEXP.git'
                
                // Install Node.js dependencies
                sh 'npm install'
                sh 'echo "npm install"'
            }
        }
        
        stage('Dockerize and Push to Docker Hub') {
            steps {
                script {
                    // Build Docker image using Dockerfile in your project
                    docker.build("hixej84931fna6/nodejs_exp:${IMAGE_TAG}")
                    sh 'echo "npm install"'

                    // Authenticate with Docker Hub
                    withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'DOCKER_HUB_CREDENTIALS', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD']]) {
                        docker.withRegistry('https://hub.docker.com', 'DOCKER_HUB_CREDENTIALS') {
                            // Push the Docker image to Docker Hub
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
